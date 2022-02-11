import { Card, Alert, Container, Row, Col } from "react-bootstrap"
import { useParams } from "react-router-dom"
import { useState, useEffect } from 'react'
import { doc, getDoc } from "firebase/firestore"
import { db } from '../firebase.config'
import GoogleForm from './GoogleForm'
import config from '../config';

const toCard = (question, response, wordCount = 0) => {
  return (
    <Card border="light" className="mb-3">
      <Card.Header>{question}</Card.Header>
      <Card.Body>
        <Card.Text>
          {response}
        </Card.Text>
        {wordCount !== 0 && <Card.Subtitle className={wordCount <= config.question_word_limit ? "text-muted" : "text-danger"}>Word Count: {wordCount} / {config.question_word_limit}</Card.Subtitle>}
      </Card.Body>
    </Card>
  )
}

const formatApplication = (questions, application, membershipOrScholarship) => {

  if (membershipOrScholarship === 'membership') {
    return (
      <>
        {toCard(questions.campus, application.campus)}
        {toCard(questions.year, application.year)}
        {toCard(questions.major, application.major)}
        {toCard(questions.gpa, application.gpa)}
        {toCard(questions.graduation_date, application.graduation_date)}
        {toCard(questions.info_session, application.info_session)}
        {toCard(questions.retreat, application.retreat)}
        {toCard("(Q1) " + questions.question1, application.question1, application.question1 === undefined ? 0 : application.question1.trim().split(" ").length)}
        {toCard("(Q2) " + questions.question2, application.question2, application.question2 === undefined ? 0 : application.question2.trim().split(" ").length)}
        {toCard("(Q3) " + questions.question3, application.question3, application.question3 === undefined ? 0 : application.question3.trim().split(" ").length)}
      </>
    )
  } else
    if (membershipOrScholarship === 'scholarship') {
      return (
        <>
          {toCard(questions.year, application.year)}
          {toCard(questions.major, application.major)}
          {toCard(questions.gpa, application.gpa)}
          {toCard(questions.graduation_date, application.graduation_date)}
          {toCard(questions.english, application.english)}
          {toCard("(Q1) " + questions.question1, application.question1, application.question1 === undefined ? 0 : application.question1.trim().split(" ").length)}
          {toCard("(Q2) " + questions.question2, application.question2, application.question2 === undefined ? 0 : application.question2.trim().split(" ").length)}
          {toCard("(Q3) " + questions.question3, application.question3, application.question3 === undefined ? 0 : application.question3.trim().split(" ").length)}
          {toCard("(Q4) " + questions.question4, application.question4, application.question4 === undefined ? 0 : application.question4.trim().split(" ").length)}
        </>
      )
    }
}


const ApplicationView = (props) => {

  const { id } = useParams()
  const [application, setApplication] = useState({})
  const [questions, setQuestions] = useState({})
  const [loadState, setLoadState] = useState('idle')

  useEffect(() => {
    const getFirestoreDocument = async (id) => {
      setLoadState('idle')
      const docRef = doc(db, props.collection, id)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        id === 'questions' ? setQuestions(docSnap.data()) : setApplication(docSnap.data())
        setLoadState('success')
      } else {
        // doc.data() will be undefined in this case
        console.log(`Could not retrieve ${props.view} application with ID: ${id}`)
        id === 'questions' ? setQuestions({}) : setApplication({})
        setLoadState('failed')
      }
    }
    getFirestoreDocument('questions')
    getFirestoreDocument(id)
  }, [id, props])

  const getApplication = () => {
    if (Object.keys(application).length === 0 && loadState === 'failed') {
      return (<Alert variant='danger'>
        <div className="text-center">Could not retrieve {props.view} application with ID: {id}</div>
      </Alert>)
    } else if (loadState === 'success') {
      return formatApplication(questions, application, props.view)
    }
  }
  return (
    props.enabled ?
      <Row className="mb-5">
        <Col>
          <Container fluid id="app-view">
            {getApplication()}
          </Container>
        </Col>
        <Col>
          <GoogleForm url={props.form_url} />
        </Col>
      </Row> :
      <div className="text-center">Grading for {props.view} applications is disabled</div>
  )
}

export default ApplicationView
