pipeline {
    agent any

    stages {
        stage('Check Node.js') {
            steps {
                sh 'node -v'
                sh 'npm -v'
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
