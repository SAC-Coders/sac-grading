import NavigationBar from './components/NavigationBar'
import ApplicationView from './components/ApplicationView'
import { Container } from 'react-bootstrap'
import config from './config'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Footer from './components/Footer'
import Login from './components/Login'
import collage from "./media/sac-collage.jpg"
import AuthProvider from './components/Auth'
import PrivateRoute from './components/PrivateRoute'
import 'bootstrap/dist/css/bootstrap.min.css'


const HomePage = () => {
  return (<div className="App">
    <Container fluid>
      <NavigationBar />
    </Container>
    <Container fluid className="content">
      <Switch>
        <Route exact path="/">
          <div className="text-center">Select grading view (membership/scholarship) and enter application ID to get started</div>
          <img
            src={collage}
            alt="SAC Collage"
            className="w-50"
            style={{ maxWidth: '50rem', margin: 'auto', display: 'block' }}
          />
        </Route>
        <Route path="/membership/:id">
          <ApplicationView view='membership' collection={'membership' + config.school_year} form_url={config.membership_form} enabled={config.membership_enabled} />
        </Route>
        <Route path="/scholarship/:id">
          <ApplicationView view='scholarship' collection={'scholarship' + config.school_year} form_url={config.scholarship_form} enabled={config.scholarship_enabled} />
        </Route>
      </Switch>
    </Container>
  </div>)
}

const App = () => {

  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <PrivateRoute path="/" component={HomePage} />
        </Switch>
        <Footer />
      </Router >
    </AuthProvider>

  )
}


export default App
