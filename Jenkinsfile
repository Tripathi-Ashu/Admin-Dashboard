pipeline {
    agent any
 
    // Injects Node.js globally so SonarScanner can parse React code
    tools {
        nodejs 'NodeJS'
    }
 
    environment {
        DOCKER_HUB_USER = 'adi1310' // Update this
        IMAGE_NAME      = "${DOCKER_HUB_USER}/react-app"
        DEPLOYMENT_NAME = "react-dashboard-deployment"
        // Automatically extracts the proper path to the fresh download
        SCANNER_HOME    = tool 'SonarScanner' 
    }
 
    stages {
        stage('SonarQube Analysis') {
            steps {
                dir('Frontend') { 
                    withSonarQubeEnv('SonarQube') {
                        sh "${SCANNER_HOME}/bin/sonar-scanner -Dsonar.projectKey=admin-dashboard -Dsonar.projectName=AdminDashboard"
                    }
                }
            }
        }
 
        stage('Quality Gate') {
            steps {
                timeout(time: 1, unit: 'HOURS') {
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
