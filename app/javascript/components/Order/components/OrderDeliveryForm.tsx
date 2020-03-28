import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

function getTranslation(key: string): string {
    const { t } = useTranslation();

    return t('order_delivery_form.' + key);
}

function getLabelText(fieldTitle: string): string {
    return getTranslation(fieldTitle);
}

function getPlaceholder(fieldTitle: string): string {
    return getTranslation("placeholder_" + fieldTitle)
}

function getFormElement(fieldTitle: string): JSX.Element {
    return (
        <Form.Group controlId="formBasicEmail">
            <Form.Label>{getLabelText(fieldTitle)}</Form.Label>
            <Form.Control placeholder={getPlaceholder(fieldTitle)} />
        </Form.Group>
    );
}

function OrderDeliveryForm(): JSX.Element {
    return (
        <>
            <Form>
                {getFormElement('first_name')}
                {getFormElement('phone_number')}
                {getFormElement('address')}
                {getFormElement('postal_code')}
                {getFormElement('email')}
                {getFormElement('delivery_notes')}
                <Button variant="primary" type="submit">
                    {getTranslation('submit')}
                </Button>
            </Form>
        </>
    );
}

export default OrderDeliveryForm;
