import React from 'react';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';

function getStyle(selectable: boolean): { cursor: string, color: string } {
    if (selectable) {
        return { cursor: "pointer", color: "#0000EE" }
    } else {
        return { cursor: "auto", color: "#000000" }
    }
}

function LanguageSelector(): JSX.Element {
    const { i18n } = useTranslation();

    return (
        <>
            <div className="mt-4" style={{ textAlign: "center" }}>
                <a
                    style={getStyle(i18n.language !== "en")}
                    role="button"
                    onClick={(): Promise<TFunction> => i18n.changeLanguage('en')}
                >
                    English
                </a> | {' '}
                <a
                    style={getStyle(i18n.language !== "fr")}
                    role="button"
                    onClick={(): Promise<TFunction> => i18n.changeLanguage('fr')}
                >
                    Français
                </a>
            </div>
        </>
    );
}

export default LanguageSelector;