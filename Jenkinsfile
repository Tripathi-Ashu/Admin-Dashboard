pipeline {
    agent any
 
    environment {
        DOCKER_HUB_USER = 'your_dockerhub_username' 
        IMAGE_NAME      = "${DOCKER_HUB_USER}/admin-dashboard"
        DEPLOYMENT_NAME = "react-dashboard-deployment"
    }
 
    stages {
        stage('SonarQube Analysis') {
            steps {
                dir('Frontend') { 
                    // This pulls the tool we named in Manage Jenkins > Tools
                    script {
                        def scannerHome = tool 'SonarScanner'
                        withSonarQubeEnv('SonarQube') {
                            sh "${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=admin-dashboard -Dsonar.projectName=AdminDashboard"
                        }
                    }
                }
            }
        }
 
        stage('Quality Gate') {
            steps {
                timeout(time: 1, unit: 'HOURS') {
                    // This pauses the pipeline and waits for SonarQube's Webhook response. 
                    // abortPipeline: true kills the pipeline if the gate fails.
                    waitForQualityGate abortPipeline: true
                }
            }
        }
 
        stage('Build Image') {
            steps {
                echo "Building Frontend Docker Image..."
                dir('Frontend') { 
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
