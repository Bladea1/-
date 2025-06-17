<?php
// Отключаем вывод ошибок напрямую в браузер
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/error.log');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

// Устанавливаем заголовок JSON
header('Content-Type: application/json');

try {
    // Логируем начало выполнения и POST данные
    error_log("Начало выполнения скрипта отправки почты");
    error_log("POST данные: " . print_r($_POST, true));
    error_log("FILES данные: " . print_r($_FILES, true));
    
    // Проверяем наличие vendor директории
    if (!is_dir('vendor')) {
        throw new Exception('Директория vendor не найдена. Выполните composer install');
    }

    // Проверяем наличие файлов PHPMailer
    $required_files = [
        'vendor/phpmailer/phpmailer/src/PHPMailer.php',
        'vendor/phpmailer/phpmailer/src/SMTP.php',
        'vendor/phpmailer/phpmailer/src/Exception.php'
    ];

    foreach ($required_files as $file) {
        if (!file_exists($file)) {
            error_log("Файл не найден: " . $file);
            throw new Exception("Файл $file не найден. Переустановите зависимости");
        }
    }

    error_log("Все необходимые файлы найдены");

    // Подключаем классы PHPMailer
    require 'vendor/phpmailer/phpmailer/src/Exception.php';
    require 'vendor/phpmailer/phpmailer/src/PHPMailer.php';
    require 'vendor/phpmailer/phpmailer/src/SMTP.php';

    // Получаем данные из формы
    $name = $_POST['name'] ?? '';
    $email = $_POST['email'] ?? '';
    $subject = $_POST['subject'] ?? '';
    $message = $_POST['message'] ?? '';

    error_log("Получены данные формы: " . json_encode([
        'name' => $name,
        'email' => $email,
        'subject' => $subject,
        'message' => $message
    ]));

    // Проверяем заполнение обязательных полей
    if (empty($name) || empty($email) || empty($message)) {
        error_log("Не заполнены обязательные поля");
        throw new Exception('Пожалуйста, заполните все обязательные поля');
    }

    // Проверяем корректность email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        error_log("Некорректный email: " . $email);
        throw new Exception('Пожалуйста, введите корректный email');
    }

    // Создаем экземпляр PHPMailer
    $mail = new PHPMailer(true);

    try {
        // Настройки сервера
        $mail->isSMTP();
        $mail->Host = 'smtp.yandex.ru';
        $mail->SMTPAuth = true;
        $mail->SMTPDebug = SMTP::DEBUG_SERVER;
        $mail->Debugoutput = function($str, $level) {
            error_log("PHPMailer DEBUG [$level]: $str");
        };

        // Проверяем наличие конфигурационного файла
        if (!file_exists('config.php')) {
            error_log("Файл конфигурации не найден");
            throw new Exception('Файл конфигурации config.php не найден');
        }

        // Загружаем конфигурацию
        $config = require 'config.php';

        if (!isset($config['email']) || !isset($config['password'])) {
            error_log("В конфигурации отсутствуют email или password");
            throw new Exception('В файле конфигурации отсутствуют необходимые параметры');
        }

        error_log("Настройка SMTP с email: " . $config['email']);

        $mail->Username = $config['email'];
        $mail->Password = $config['password'];
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port = 465;
        $mail->CharSet = 'UTF-8';

        // Получатели
        $mail->setFrom($config['email'], 'GraffZone');
        $mail->addAddress($config['email']);
        $mail->addReplyTo($email, $name);

        // Контент
        $mail->isHTML(true);
        $mail->Subject = "Сообщение с сайта GraffZone: " . $subject;

        // Формируем тело письма
        $emailBody = "
        <html>
        <head>
            <title>Новое сообщение с сайта GraffZone</title>
        </head>
        <body>
            <h2>Новое сообщение с формы обратной связи</h2>
            <p><strong>Имя:</strong> " . htmlspecialchars($name) . "</p>
            <p><strong>Email:</strong> " . htmlspecialchars($email) . "</p>
            <p><strong>Тема:</strong> " . htmlspecialchars($subject) . "</p>
            <p><strong>Сообщение:</strong></p>
            <p>" . nl2br(htmlspecialchars($message)) . "</p>
        </body>
        </html>
        ";

        $mail->Body = $emailBody;
        $mail->AltBody = strip_tags($message);

        error_log("Попытка отправки письма...");
        
        // Отправляем
        $mail->send();
        
        error_log("Письмо успешно отправлено");

        echo json_encode([
            'success' => true,
            'message' => 'Спасибо! Ваше сообщение успешно отправлено'
        ]);

    } catch (Exception $e) {
        error_log("Ошибка при настройке или отправке письма: " . $e->getMessage());
        throw new Exception('Ошибка при отправке письма: ' . $e->getMessage());
    }

} catch (Exception $e) {
    error_log("Общая ошибка: " . $e->getMessage());
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}
?> 