import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
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
        <Widget
          as={motion.section}
          transition={{ delay: 0, duration: 1}}
          variants={{
            show:{ opacity: 1, x: '0'},
            hidden: { opacity: 0, x: '100%'},
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Header>
            <h1 align="center"># Quiz da pandemia sobre o Covid-19: conheça mais sobre esse novo vírus e se cuide!</h1>
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

        <Widget
          as={motion.section}
          transition={{ delay: 0, duration: 1}}
          variants={{
            show:{ opacity: 1, y: '0'},
            hidden: { opacity: 0, y: '100%'},
          }}
          initial="hidden"
          animate="show"
        >
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
        <Footer
          as={motion.section}
          transition={{ delay: 0, duration: 0.5}}
          variants={{
            show:{ opacity: 1},
            hidden: { opacity: 0},
          }}
          initial="hidden"
          animate="show"
        />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/juuliana"/>
    </QuizBackground>
  );
}