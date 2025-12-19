pipeline {
    agent any
    tools {
        maven 'M2_HOME'
    }
    environment {
        DOCKER_CREDENTIALS = credentials('docker_cred')
        IMAGE_NAME = 'khalilsahnoun/student-management'
        IMAGE_TAG  = '1.0.3'   // <<< INCRÉMENTE ICI (1.0.2, 1.0.3, ...)
    }

    stages {
        stage('Code fetch') {
            steps {
                git branch: 'master',
                    url: 'https://github.com/khalilsahnoun123/khalilsahnoun4SAE9.git'
            }
        }

        stage('Code Build') {
            steps {
                sh 'mvn test'
            }
        }

        stage('Code Package') {
            steps {
                sh 'mvn package'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('soarqube_k8s') {
                    sh '''
                      mvn sonar:sonar \
                        -Dsonar.projectKey=tn.esprit:student-management \
                        -Dsonar.host.url=$SONAR_HOST_URL \
                        -Dsonar.ws.timeout=300
                    '''
                }
            }
        }

        stage('Docker Build') {
            steps {
                sh "docker build -t ${IMAGE_NAME}:${IMAGE_TAG} ."
            }
        }

        stage('Docker Push') {
            steps {
                sh 'echo $DOCKER_CREDENTIALS_PSW | docker login -u $DOCKER_CREDENTIALS_USR --password-stdin'
                sh "docker push ${IMAGE_NAME}:${IMAGE_TAG}"
            }
        }

        stage('Kubernetes Deploy') {
            steps {
                sh '''
                  echo "Applying Kubernetes manifests (namespace devops)"

                  kubectl apply -n devops -f k8s/mysql-pv.yaml
                  kubectl apply -n devops -f k8s/mysql-pvc.yaml
                  kubectl apply -n devops -f k8s/mysql-deployment.yaml
                  kubectl apply -n devops -f k8s/mysql-service.yaml

                  kubectl apply -n devops -f k8s/spring-deployment.yaml
                  kubectl apply -n devops -f k8s/spring-service.yaml
                '''
            }
        }

        stage('Deploy MySQL & Spring Boot on K8s') {
            steps {
                sh """
                  echo "Updating Spring Boot deployment image and checking pods"

                  kubectl -n devops set image deployment/spring-app \
                    spring-app=${IMAGE_NAME}:${IMAGE_TAG} --record

                  kubectl -n devops rollout status deployment/spring-app --timeout=300s

                  kubectl get pods -n devops
                  kubectl get svc -n devops
                """
            }
        }
    }

    post {
        always {
            echo "======always======"
        }
        success {
            echo "=====pipeline executed successfully ====="
        }
        failure {
            echo "======pipeline execution failed======"
        }
    }
}


