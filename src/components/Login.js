import { Form, Button, Card, Container } from "react-bootstrap";
import { useContext, useCallback } from 'react'
import { auth } from "../firebase.config"
import { signInWithEmailAndPassword } from "firebase/auth"
import { AuthContext } from "./Auth";
import { Redirect, withRouter } from "react-router";

const Login = ({ history }) => {

  const handleLogin = useCallback(
    async (e) => {
      e.preventDefault()
      const password = e.target[0].value

      try {
        await signInWithEmailAndPassword(auth, "osusacer@gmail.com", password)
        history.push("/")
      } catch (error) {
        if (password.length === 0) {
          alert('Enter a password')
        } else if (error.code === 'auth/wrong-password') {
          alert('Wrong password')
        } else {
          alert(error.message)
        }
      }
    }, [history]
  )
  const { currentUser } = useContext(AuthContext)

  if (currentUser) {
    return <Redirect to="/" />
  }
  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>

      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card.Body>
          <p className="text-center mb-4" style={{ fontSize: "25px" }}>SAC Application Grading</p>
          <Form onSubmit={handleLogin}>
            <Form.Group id="password">
              <Form.Control type="password" className="mb-3" placeholder="Password"></Form.Control>
            </Form.Group>
            <Button type="submit" variant="danger" className="w-100">Log In</Button>
          </Form>
        </Card.Body>
      </div>
    </Container >
  )
}

export default withRouter(Login)
