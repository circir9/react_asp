// properties([pipelineTriggers([githubPush()])])
// node {
//     git url: 'https://github.com/circir9/simple_react_express_mongo.git',
//     branch: 'jenkins'
// }

pipeline{
    // agent any

    agent {
        docker { 
            image 'cypress_dotnet:latest' }
    }

    // tools {nodejs "16.18.0"}
    options{
        // add ansicolor plugin
        ansiColor('xterm')
    }

    environment {
        CYPRESS_CACHE_FOLDER = "react_csharp_cypress_test/.Cache/Cypress"
    }
    
    stages{
        stage('Install'){
            steps{
                dir("client"){
                    echo 'npm install'
                    sh 'npm install'
                    // sh 'ls /home/node/.cache/Cypress'
                    sh './node_modules/.bin/cypress install'
                }
            }
        }

        stage('Start react server') {
            steps {
                dir("client"){
                    sh 'npm run start &'
                }
            }
        }

        stage('Start C# api server') {
            steps {
                dir("server"){
                    sh 'dotnet run &'
                }
            }
        }

        stage('Testing with cypress') {
            steps {
                dir("client"){
                    sh 'npx cypress cache path'
                    sh "npx cypress run --spec 'cypress/e2e/*' --config video=false"
                }
            }
        }
    }
    // post {
    //         always {
    //             echo 'Stopping local server'
    //             sh 'pkill -f http-server'
    //         }
    //     }
}