import React from 'react';
import db from '../../db.json';
import { motion } from 'framer-motion';
import Widget from '../../src/components/Widget';
import QuizBackground from '../../src/components/QuizBackground';
import QuizContainer from '../../src/components/QuizContainer';
import AlternativesForm from '../../src/components/AlternativesForm';
import Button from '../../src/components/Button';
import Loading from '../../src/components/Loading';
import BackLinkArrow from '../../src/components/BackLinkArrow';

function ResultWidget({ results }) {
  return (
    <Widget 
      as={motion.section}
      animate={{ rotate: 360 }}
      transition={{ duration: 3 }}
    >
      <Widget.Header>
        <BackLinkArrow href="/"/>

        <h1>
          Você acertou 
          {' '}
          { results.reduce((somatoriaAtual, resultAtual) => {
              const isTrue = resultAtual === true;
              if(isTrue){
                  return somatoriaAtual + 1;
              }

              return somatoriaAtual;
          }, 0)}
          {' '}
          perguntas de 7!
        </h1>
      </Widget.Header>

      <Widget.Content>
        {/*<ul align="center">
          {results.map((result, index) => (
            <li key={`result__${result}`}>
              #
              {index + 1}
              {' '}
              Resultado:
              {result === true
                ? 'Acertou'
                : 'Errou'}
            </li>
          ))}
        </ul>*/}
        <Widget.Topic>
          <h2>Nesse período, é de extrema importância estarmos cientes sobre os métodos necessários para a prevenção da Covid-19.</h2>
        </Widget.Topic>
        
        <Widget.Header>
          <h1>E além de todos esses procedimentos, conhecer quais os principais sintomas e saber quando precisamos procurar o serviço de saúde.</h1>
        </Widget.Header>

        <Widget.Topic>
          <h3>Ajude a salvar vidas!</h3>
        </Widget.Topic>
      </Widget.Content>
    </Widget>
  );
}

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Loading>
        <Loading/>
      </Widget.Loading>
    </Widget>
  );
}

function QuestionWidget({
  question,
  questionIndex,
  totalQuestions,
  onSubmit,
  addResult
}) {
    const [selectedAlternative, setSelectedAlternative] = React.useState(undefined);
    const [isQuestionSubmit, setIsQuestionSubmit] = React.useState();
    const questionId = `question__${questionIndex}`;
    const isCorrect = selectedAlternative === question.answer;
    const hasAlternativeSelected = selectedAlternative !== undefined ;

    return (
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
                <h3>
                {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
                </h3>
            </Widget.Header>

            <img
                alt="Descrição"
                style={{
                width: '100%',
                height: '150px',
                objectFit: 'cover',
                }}
                src={question.image}
            />
            <Widget.Content>
                <h2>
                {question.title}
                </h2>
                <br></br>

                <AlternativesForm
                onSubmit={(infosDoEvento) => {
                    infosDoEvento.preventDefault();
                    setIsQuestionSubmit(true);
                    setTimeout(() => {
                        addResult(isCorrect);
                        onSubmit();
                        setIsQuestionSubmit(false);
                        setSelectedAlternative(undefined);
                    }, 8 * 1000);
                }}
                >
                    {question.alternatives.map((alternative, alternativeIndex) => {
                        const alternativeId = `alternative__${alternativeIndex}`;
                        const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
                        const isSelected = selectedAlternative === alternativeIndex;
                        return (
                        <Widget.Topic
                            as="label"
                            key={alternativeId}
                            htmlFor={alternativeId}
                            data-selected={isSelected}
                            data-status={isQuestionSubmit && alternativeStatus}
                        >
                            <input
                                style={{ display: 'none' }}
                                id={alternativeId}
                                name={questionId}
                                onChange={() => setSelectedAlternative(alternativeIndex)}
                                type="radio"
                            />
                            {alternative}
                        </Widget.Topic>
                        );
                    })}

                    <Button type="submit" disabled={!hasAlternativeSelected}>
                        Confirmar
                    </Button>

                    {isQuestionSubmit && isCorrect &&
                      <Widget.Topic><h1>Você acertou!</h1> {question.description}</Widget.Topic>
                    }

                    {isQuestionSubmit && !isCorrect &&
                      <Widget.Topic><h1>Você errou!</h1> {question.description}</Widget.Topic>
                    }
                    
                </AlternativesForm>
            </Widget.Content>
        </Widget>
    );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

export default function QuizPage() {
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const [results, setResults] = React.useState([]);
  const totalQuestions = db.questions.length;
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];

  function addResult(result){
      setResults([
        ...results,
        result,
      ]);
  }

  React.useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 1000);
  }, []);

  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
            onSubmit={handleSubmitQuiz}
            addResult={addResult}
          />
        )}

        {screenState === screenStates.LOADING && <LoadingWidget/>}

        {screenState === screenStates.RESULT && <ResultWidget results={results}/>}
      </QuizContainer>
    </QuizBackground>
  );
}