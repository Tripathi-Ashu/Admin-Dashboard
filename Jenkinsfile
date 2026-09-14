pipeline {

    agent any
 
    environment {

        DOCKER_HUB_USER = 'adi1310' // Replace with your Docker Hub ID

        IMAGE_NAME      = "${DOCKER_HUB_USER}/react-app"

        DEPLOYMENT_NAME = "react-dashboard-deployment"

    }
 
    stages {

        stage('Build Image') {

            steps {
                dir('Frontend'){

                echo "Building Frontend Docker Image..."

                sh "docker build -t ${IMAGE_NAME}:latest ."

            }

        }
        } 
        stage('Push to Docker Hub') {

            steps {

                echo "Pushing Image to Registry..."

                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', passwordVariable: 'DOCKER_PASS', usernameVariable: 'DOCKER_USER')]) {

                    sh '''

                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin

                    '''

                    sh "docker push ${IMAGE_NAME}:latest"

                }

            }

        }
 
        stage('Deploy to Kubernetes') {

            steps {

                echo "Triggering Deployment Rollout..."

                withCredentials([file(credentialsId: 'kubeconfig-file', variable: 'KUBECONFIG_PATH')]) {

                    sh "kubectl --kubeconfig=\$KUBECONFIG_PATH rollout restart deployment ${DEPLOYMENT_NAME}"

                }

            }

        }

    }
 
    post {

        always {

            sh "docker logout"

        }

    }

}
 
