import React, { createContext, useState } from 'react';
import { FeedbackData } from '../data/FeedbackData';

import { Feedback } from '../modules/Feedback';

const FeedbackContext = createContext({
    feedback: [] as Feedback[],
    feedbackEdit: { item: {} as Feedback, edit: false },
    addFeedback: (newFeedback: Feedback) => {},
    editFeedback: (item: Feedback) => {},
    updataFeedback: (id: string, updItem: Feedback) => {},
    deleteFeedback: (id: string) => {},
});

type Props = {
    children: React.ReactNode;
};

export const FeedbackProvider: React.FC<Props> = ({ children }) => {
    const [feedback, setFeedback] = useState([...FeedbackData]);
    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {} as Feedback,
        edit: false,
    });

    const addFeedback = (newFeedback: Feedback) => {
        setFeedback([newFeedback, ...feedback]);
    };

    const editFeedback = (item: Feedback) => {
        setFeedbackEdit({
            item,
            edit: true,
        });
    };

    const updataFeedback = (id: string, updItem: Feedback) => {
        setFeedback(
            feedback.map((item) => {
                return item.id === id ? { ...item, ...updItem } : item;
            }),
        );

        setFeedbackEdit({ item: {} as Feedback, edit: false });
    };

    const deleteFeedback = (id: string) => {
        if (window.confirm('Are you sure you want to delete?')) {
            const newFeedback = feedback.filter((item) => item.id !== id);
            setFeedback(newFeedback);
        }
    };

    return (
        <FeedbackContext.Provider
            value={{ feedback, feedbackEdit, addFeedback, editFeedback, updataFeedback, deleteFeedback }}
        >
            {children}
        </FeedbackContext.Provider>
    );
};

export default FeedbackContext;
