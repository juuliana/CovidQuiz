import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import db from '../db.json';
import Widget from '../src/components/Widget';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizBackground from '../src/components/QuizBackground';
import Input from '../src/components/Input';
import Link from '../src/components/Link';
import Button from '../src/components/Button';
import QuizContainer from '../src/components/QuizContainer';
import QuizLogo from '../src/components/QuizLogo';

export default function Home() {
  const router = useRouter();
  const [name, setName] = React.useState('');
  
  return(
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>QuizCovid</title>
      </Head>
      <QuizContainer>
        <QuizLogo/>
        <Widget>
          <Widget.Header>
            <h1># Quiz da pandemia sobre o Covid-19</h1>
          </Widget.Header>
          <Widget.Content>
            <form onSubmit={function(infosDoEvento){
              infosDoEvento.preventDefault();
                       
              router.push(`/quiz?name=${name}`);

            }}>
              <Input
                name="nomeDoJogador"
                onChange={(infosDoEvento) => setName(infosDoEvento.target.value)}
                placeholder="Insira o seu nome"
                value={name}
              />
              <Button type="submit" disabled={name.length === 0}>
                {`Teste seu conhecimento ${name}`}
              </Button>
            </form>
          </Widget.Content>
        </Widget>

        <Widget>
          <Widget.Header>
            <h1>Quizzes da ImersãoReactNext - Alura</h1>
          </Widget.Header>
          <Widget.Content>
            <ul>
            {db.external.map((linkExterno) => {
              const[projectName, githubUser] = linkExterno
                .replace(/\//g, '')
                .replace('https:', '')
                .replace('vercel.app', '')
                .split('.');

              return (
                <li key={linkExterno}>
                  <Widget.Topic
                    as={Link}
                    href={`/quiz/${projectName}___${githubUser}`}
                  >
                    {`${githubUser}/${projectName}`}
                  </Widget.Topic>
                </li>
              );
            })}              
            </ul>
          </Widget.Content>
        </Widget>
        <Footer/>
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/juuliana"/>
    </QuizBackground>
  );
}