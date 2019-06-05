import React, { Component, FormEvent } from "react";
import "./CreateProfile.css";
import { Form, FormControlProps, Col } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { ReplaceProps, BsPrefixProps } from "react-bootstrap/helpers";
import { UserService } from "../../../api/UserService";

export default class CreateProfile extends Component<IProps, IState>{

    constructor(props: IProps) {
        super(props);

        this.state = {
            username: "",
            firstname: "",
            lastname: "",
            email: "",
            confirmationPassword: "",
            password: "",
            errorMessage: ""
        };
    }

    render() {
        return (
            <div className="CreateProfile">
                <Form
                    inline
                    onSubmit={(e: any) => this.handleSubmit(e)}>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label  column sm="4">Username</Form.Label>
                            <Form.Control
                                autoFocus
                                required
                                name="username"
                                value={this.state.username}
                                onChange={(e: any) => this.handleChange(e)}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please choose a username.
            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} >
                            <Form.Label  column sm="4">Password</Form.Label>
                            <Form.Control
                                required
                                name="password"
                                value={this.state.password}
                                onChange={(e: any) => this.handleChange(e)}
                                type="password"
                                isValid={!!this.state.password && this.state.password.length > 3}
                            />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label column sm="4">Confirm Password</Form.Label>
                            <Form.Control
                                required
                                name="confirmationPassword"
                                value={this.state.confirmationPassword}
                                onChange={(e: any) => this.handleChange(e)}
                                type="password"
                                isValid={!!this.state.password && this.state.confirmationPassword === this.state.password}

                            />

                            <Form.Control.Feedback type="invalid">
                                Please choose a password.
              </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label  column sm="4">First name</Form.Label>
                            <Form.Control
                                required
                                name="firstname"
                                value={this.state.firstname}
                                onChange={(e: any) => this.handleChange(e)}
                                isValid={!!this.state.firstname }
                            />
                            <Form.Control.Feedback type="invalid"> Please choose first name. </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label  column sm="4">Last name</Form.Label>
                            <Form.Control
                                required
                                name="lastname"
                                value={this.state.lastname}
                                onChange={(e: any) => this.handleChange(e)}
                                isValid={!!this.state.lastname }
                            />
                            <Form.Control.Feedback type="invalid"> Please choose last name.</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Control
                                required
                                name="email"
                                value={this.state.email}
                                onChange={(e: any) => this.handleChange(e)}
                                type='email'
                                isValid={!!this.state.email }
                            />
                            <Form.Control.Feedback type="invalid"> Please choose email. </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Check
                                required
                                label="Agree to to anything in the terms and conditions and anything else."
                                feedback="You must agree before submitting."
                            />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Button block type="submit">
                                Create Profile
          </Button>
                        </Form.Group>
                    </Form.Row>
                </Form>

                <h3>{this.state.errorMessage}</h3>
            </div>
        );
    }

    handleChange(e: React.ChangeEvent<HTMLInputElement> | FormEvent<ReplaceProps<"input", BsPrefixProps<"input"> & FormControlProps>>): void {
        const key = e.currentTarget.name;
        const value = e.currentTarget.value;

        if (key && Object.keys(this.state).includes(key)) {
            this.setState({ [key]: value } as Pick<IState, keyof IState>);
        }
    }

    handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        e.stopPropagation();

        const form = e.currentTarget;
        if (form.checkValidity() === true) {

            const userService = new UserService();
            userService
                .register(this.context.token, this.state.username, this.state.password, this.state.email, this.state.firstname, this.state.lastname)
                .then((response: Response) => {
                    if (response.status === 200) {
                        this.onRegisterSuccess();
                    } else {
                        response.text().then( errors => this.onRegisterFailed(errors));
                    }
                    return response;
                })
                .catch((error) =>
                    this.onRegisterFailed(error.toString())
                );
        }
    }

    onRegisterFailed(error: string) {
        this.setState({ errorMessage: error });
    }

    onRegisterSuccess() {
        this.props.history.push("/login");
    }
}

interface IState {
    username: string,
    firstname: string,
    lastname: string,
    email: string,
    confirmationPassword: string,
    password: string,
    errorMessage: string
}

interface IProps {
    history: string[];
}