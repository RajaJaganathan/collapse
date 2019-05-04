import React from "react";
import ReactDOM from "react-dom";

import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

import MyCollapse from "./Collapse";
import {
  Row,
  Col,
  Card,
  CardBody,
  Collapse,
  InputGroup,
  InputGroupAddon,
  Button,
  Input
} from "reactstrap";

class App extends React.Component {
  state = { isOpen: false };

  handleToggle = e => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  };

  render() {
    return (
      <div className="App">
        <Button className="btn btn-primary" onClick={this.handleToggle} style={{margin: '20px'}}>
          Toggle
        </Button>

        <Row>
          <Col>
            <MyCollapse isOpen={this.state.isOpen}>
              <Card>
                <CardBody>
                  <div>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <Button>To the Left!</Button>
                      </InputGroupAddon>
                      <Input />
                    </InputGroup>
                    <br />
                    <InputGroup>
                      <Input />
                      <InputGroupAddon addonType="append">
                        <Button color="secondary">To the Right!</Button>
                      </InputGroupAddon>
                    </InputGroup>
                    <br />
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <Button color="danger">To the Left!</Button>
                      </InputGroupAddon>
                      <Input placeholder="and..." />
                      <InputGroupAddon addonType="append">
                        <Button color="success">To the Right!</Button>
                      </InputGroupAddon>
                    </InputGroup>
                  </div>
                </CardBody>
              </Card>
            </MyCollapse>
          </Col>
        </Row>
        
        <Row>
          <Col>
            <Collapse isOpen={true}>
              <Card>
                <CardBody>
                  Anim pariatur cliche reprehenderit, enim eiusmod high life
                  accusamus terry richardson ad squid. Nihil anim keffiyeh
                  helvetica, craft beer labore wes anderson cred nesciunt
                  sapiente ea proident.
                </CardBody>
              </Card>
            </Collapse>
          </Col>
          <Col>
            <Collapse isOpen={true}>
              <Card>
                <CardBody>
                  Anim pariatur cliche reprehenderit, enim eiusmod high life
                  accusamus terry richardson ad squid. Nihil anim keffiyeh
                  helvetica, craft beer labore wes anderson cred nesciunt
                  sapiente ea proident.
                </CardBody>
              </Card>
            </Collapse>
          </Col>
        </Row>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

export default App;
