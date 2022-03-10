import React, { createContext, useEffect, useState } from 'react';
import { Feedback } from '../modules/Feedback';

const FeedbackContext = createContext({
    feedback: [] as Feedback[],
    feedbackEdit: { item: {} as Feedback, edit: false },
    isLoadding: true,
    addFeedback: (newFeedback: Feedback) => {},
    editFeedback: (item: Feedback) => {},
    updataFeedback: (id: string, updItem: Feedback) => {},
    deleteFeedback: (id: string) => {},
});

type Props = {
    children: React.ReactNode;
};

export const FeedbackProvider: React.FC<Props> = ({ children }) => {
    const [isLoadding, setIsLoading] = useState(true);
    const [feedback, setFeedback] = useState<Feedback[]>([]);
    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {} as Feedback,
        edit: false,
    });

    useEffect(() => {
        fetchFeedback();
    }, []);

    const fetchFeedback = async () => {
        const response = await fetch('/feedback?_sort=id&_order=desc');
        const data = await response.json();

        setFeedback(data);
        setIsLoading(false);
    };

    const addFeedback = async (newFeedback: Feedback) => {
        const response = await fetch('/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newFeedback),
        });

        const data = await response.json();

        setFeedback([data, ...feedback]);
    };

    const editFeedback = (item: Feedback) => {
        setFeedbackEdit({
            item,
            edit: true,
        });
    };

    const updataFeedback = async (id: string, updItem: Feedback) => {
        const response = await fetch(`/feedback/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updItem),
        });

        const data = await response.json();

        setFeedback(
            feedback.map((item) => {
                return item.id === id ? { ...item, ...data } : item;
            }),
        );

        setFeedbackEdit({ item: {} as Feedback, edit: false });
    };

    const deleteFeedback = async (id: string) => {
        if (window.confirm('Are you sure you want to delete?')) {
            await fetch(`/feedback/${id}`, { method: 'DELETE' });
            const newFeedback = feedback.filter((item) => item.id !== id);
            setFeedback(newFeedback);
        }
    };

    return (
        <FeedbackContext.Provider
            value={{ feedback, feedbackEdit, isLoadding, addFeedback, editFeedback, updataFeedback, deleteFeedback }}
        >
            {children}
        </FeedbackContext.Provider>
    );
};

export default FeedbackContext;
