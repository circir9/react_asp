// properties([pipelineTriggers([githubPush()])])
// node {
//     git url: 'https://github.com/circir9/simple_react_express_mongo.git',
//     branch: 'jenkins'
// }

pipeline{
    agent any
    
    stages{
        stage('Install'){
            steps{
                sh 'cd client'
                sh 'npm install'
            }
        }

        stage('Start react server') {
            steps {
                sh 'cd client'
                sh 'nohup npm run start &'
            }
        }

        stage('Start C# api server') {
            steps {
                sh 'cd server'
                sh 'nohup dotnet run &'
            }
        }

        stage('Testing with cypress') {
            steps {
                sh 'cd client'
                sh 'npx cypress run'
            }
        }
    }
    post {
            always {
                echo 'Stopping local server'
                sh 'pkill -f http-server'
            }
        }
}