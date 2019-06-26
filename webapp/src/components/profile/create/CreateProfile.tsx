import React, { Component, FormEvent } from "react";
import "./CreateProfile.css";
import { UserService } from "../../../api/UserService";
import { Link } from "react-router-dom";
import { Form, Button, Checkbox, Header, Container } from "semantic-ui-react";

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

            <Container className="CreateProfile">
                <Header as='h1'> Create Profile </Header>
                <Form
                    inline
                    onSubmit={(e: any) => this.handleSubmit(e)}>
                    <Form.Field>
                        <label>Username</label>
                        <input
                            type="text"
                            name="username"
                            value={this.state.username}
                            onChange={(e: any) => this.handleChange(e)}
                        />

                    </Form.Field>

                    <Form.Field>
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={this.state.password}
                            onChange={(e: any) => this.handleChange(e)}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Confirm Password</label>
                        <input
                            
                            type="password"
                            name="confirmationPassword"
                            value={this.state.confirmationPassword}
                            onChange={(e: any) => this.handleChange(e)}
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>First name</label>
                        <input
                            type="text"
                            name="firstname"
                            value={this.state.firstname}
                            onChange={(e: any) => this.handleChange(e)}
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>Last name</label>
                        <input
                            name="lastname"
                            value={this.state.lastname}
                            onChange={(e: any) => this.handleChange(e)}
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>Email</label>
                        <input
                            name="email"
                            value={this.state.email}
                            onChange={e => this.handleChange(e)}
                            type='email'
                        />
                    </Form.Field>
                    <Form.Field>
                        <Checkbox
                            novalidate
                            label="Agree to to anything in the terms and conditions and anything else."
                            feedback="You must agree before submitting."
                        />
                    </Form.Field>
                    <Form.Field>
                        <Button type="submit">
                            Create Profile
                            </Button>
                        <Button type="button">
                            <Link to="/login">Cancel</Link>
                        </Button>
                    </Form.Field>
                </Form>

                <h3>{this.state.errorMessage}</h3>
            </Container>
        );
    }

    handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
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
                        response.text().then(errors => this.onRegisterFailed(errors));
                    }
                    return response;
                })
                .catch((error) =>
                    this.onRegisterFailed(error.toString())
                );
        }
    }

    onRegisterFailed(error: string) {
        this.setState({...this.state, errorMessage: error});
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