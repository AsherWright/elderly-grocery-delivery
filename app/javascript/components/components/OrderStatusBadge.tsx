import React from 'react';
import { useTranslation } from 'react-i18next';
import { Badge, BadgeProps } from 'react-bootstrap';
import { OrderStatus } from '../types';

interface OrderStatusBadgeProps {
    status: OrderStatus;
    className?: string;
}

function getBadge(className: string | undefined, variant: BadgeProps['variant'], text: string): JSX.Element {
    return <Badge className={className} pill variant={variant}>{text}</Badge>;
}

function OrderStatusBadge(props: OrderStatusBadgeProps): JSX.Element {
    const { t } = useTranslation();
    const { status, className } = props;

    switch (status) {
        case OrderStatus.Unconfirmed:
            return getBadge(className, "secondary", t('order_status_badge.draft'))
        case OrderStatus.Confirmed:
            return getBadge(className, "primary", t('order_status_badge.confirmed'))
        case OrderStatus.Assigned:
            return getBadge(className, "info", t('order_status_badge.assigned'))
        case OrderStatus.BeingDelivered:
            return getBadge(className, "warning", t('order_status_badge.being_delivered'))
        case OrderStatus.Completed:
            return getBadge(className, "success", t('order_status_badge.completed'))
        case OrderStatus.Cancelled:
            return getBadge(className, "danger", t('order_status_badge.cancelled'))
        case OrderStatus.Unknown:
            return getBadge(className, "danger", t('order_status_badge.unknown'))
    }
}

export default OrderStatusBadge;