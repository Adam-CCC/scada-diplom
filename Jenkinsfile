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
                sh 'npm run test'
            }
        }
    }

    post {
        success {
            echo 'Build and tests completed successfully!'
        }
        failure {
            echo 'Build or tests failed!'
        }
    }
}
