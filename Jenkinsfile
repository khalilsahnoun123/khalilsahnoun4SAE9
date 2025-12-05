pipeline{
	agent any
	tools{
		maven 'M2_HOME'
	}
	environment {
 		DOCKER_CREDENTIALS=credentials('docker_cred')
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
		stage('Code Package'){
			steps{
				sh 'mvn package'
			}
		}
		stage('SonarQube Analysis'){
		    steps{
				withSonarQubeEnv('sonarqube') {
		        	sh "mvn sonar:sonar"
				}
		    }
		}
		stage('Docker Build'){
			steps{
				script{
					sh "docker build -t khalilsahnoun/student-management:1.0.0 ."
				}
			}
		}
		stage('Docker Push'){
			steps{
				script{
					sh 'echo $DOCKER_CREDENTIALS_PSW | docker login -u $DOCKER_CREDENTIALS_USR --password-stdin'
					sh "docker push khalilsahnoun/student-management:1.0.0 "
				}
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

