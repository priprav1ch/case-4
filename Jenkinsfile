pipeline {
    agent any

    environment {
        PATH = "/opt/homebrew/opt/node@20/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"
        DOCKER_IMAGE = "priprav1ch228/my-app:latest"
        DOCKER_CREDENTIALS_ID = "docker-hub-credentials"
        NOTIFICATION_EMAIL = "adventchiken@gmail.com"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Lint') {
            steps {
                sh 'npm install'
                sh 'npm run lint'
            }
        }

        stage('Unit Tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t ${DOCKER_IMAGE} ."
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: env.DOCKER_CREDENTIALS_ID, usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                        sh "docker push ${DOCKER_IMAGE}"
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                echo "Развертывание (эмуляция) успешно завершено!"
            }
        }
    }

    post {
        success {
            mail (
                to: env.NOTIFICATION_EMAIL,
                subject: "✅ Jenkins: ${env.JOB_NAME} #${env.BUILD_NUMBER} - SUCCESS",
                body: "Сборка завершилась успешно.\nДетали: ${env.BUILD_URL}"
            )
        }
        failure {
            mail (
                to: env.NOTIFICATION_EMAIL,
                subject: "❌ Jenkins: ${env.JOB_NAME} #${env.BUILD_NUMBER} - FAILED",
                body: "Сборка упала с ошибкой.\nПроверь консоль: ${env.BUILD_URL}console"
            )
        }
    }
}
