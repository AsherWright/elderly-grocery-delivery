import React from 'react';
import { Link } from "react-router-dom";
import { Button, Card } from 'react-bootstrap';

interface HomeCardProps {
    buttonLinkPath: string;
    buttonText: string;
    cardText: string;
    disabled?: boolean;
    header: string;
}

function HomeCard(props: HomeCardProps): JSX.Element {
    const { buttonLinkPath, buttonText, cardText, disabled, header } = props;

    return (
        <Card>
            <Card.Header as="h5">{header}</Card.Header>
            <Card.Body>
                <Card.Title>
                    <Link to={buttonLinkPath}>
                        <Button disabled={disabled} block>
                            {buttonText}
                        </Button>
                    </Link>
                </Card.Title>
                <Card.Text>
                    {cardText}
                </Card.Text>
            </Card.Body>
        </Card >
    );
}

export default HomeCard;