pipeline {
    agent any

    stages {
        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                sh 'npm install'
            }
        }

        stage('Build and Start Server') {
            steps {
                echo 'Building and starting the Angular project...'
                sh '''
                nohup npm run start > server.log 2>&1 &
                sleep 5 # Немного ждём запуска сервера
                '''
                // Проверяем, доступен ли сервер
                script {
                    def maxRetries = 10
                    def retries = 0
                    while (retries < maxRetries) {
                        def result = sh(script: "curl -s http://localhost:4200", returnStatus: true)
                        if (result == 0) {
                            echo "Server started successfully!"
                            break
                        } else {
                            echo "Waiting for server to start..."
                            sleep(2)
                            retries++
                        }
                    }
                    if (retries == maxRetries) {
                        error("Server failed to start within the timeout period.")
                    }
                }
            }
        }

        stage('Run Tests') {
            steps {
                echo 'Running unit tests...'
                sh '''
                nohup npm run test > test.log 2>&1 &
                echo $! > test.pid # Сохраняем PID тестового процесса
                '''
                // Ожидание старта тестов и их завершения
                script {
                    def maxRetries = 20
                    def retries = 0
                    while (retries < maxRetries) {
                        // Проверяем, жив ли процесс
                        def testProcess = sh(script: "ps -p $(cat test.pid) > /dev/null 2>&1", returnStatus: true)
                        if (testProcess != 0) {
                            echo "Tests completed!"
                            break
                        } else {
                            echo "Waiting for tests to complete..."
                            sleep(5)
                            retries++
                        }
                    }
                    if (retries == maxRetries) {
                        error("Tests did not complete within the timeout period.")
                    }

                    // Проверяем результат тестов
                    def testLog = readFile('test.log')
                    if (testLog.contains('FAIL') || testLog.contains('ERR')) {
                        error("Tests failed. Check test.log for details.")
                    } else {
                        echo "Tests passed successfully!"
                    }
                }
            }
        }
    }

    post {
        success {
            echo 'Build and tests completed successfully!'
        }
        failure {
            echo 'Build or tests failed!'
            archiveArtifacts artifacts: 'server.log, test.log', allowEmptyArchive: true
        }
    }
}
