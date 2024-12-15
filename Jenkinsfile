pipeline {
    agent any

    stages {
        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                sh 'npm install'
            }
        }

        stage('Build Project') {
            steps {
                echo 'Building the Angular project...'
                sh '''
                nohup npm run start > server.log 2>&1 &
                '''
            }
        }

        stage('Run Tests') {
            steps {
                echo 'Running unit tests...'
                sh '''
                nohup npm run test > server.log 2>&1 &
                '''
            }
        }
    }

    post {
        success {
            echo 'Build completed successfully!'
        }
        failure {
            echo 'Build failed!'
        }
    }
}
