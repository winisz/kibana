#!/usr/bin/env groovy

// Licensed to Elasticsearch B.V. under one or more contributor
// license agreements. See the NOTICE file distributed with
// this work for additional information regarding copyright
// ownership. Elasticsearch B.V. licenses this file to you under
// the Apache License, Version 2.0 (the "License"); you may
// not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.

pipeline {
  // agent { dockerfile true } // bootstraps via Dockerfile
  agent { label 'linux && immutable' }
  stages {
    // stage('Docker Build and Run an easy yarn script') {
    //   steps{
    //     sh 'docker build -t kibana-ci:base .'
    //     sh 'docker run --rm kibana-ci:base kbn'
    //   }
    // }
    stage('Docker Build and Run an easy yarn script') {
      steps {
        script {
          def baseImage = docker.build("kibana-ci:${env.BUILD_ID}")

          baseImage.inside {
              sh 'kbn'
          }
        }
      }
    }
  }
}
