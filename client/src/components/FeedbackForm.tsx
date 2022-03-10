import { useContext, useEffect, useState } from 'react';
import FeedbackContext from '../context/FeedbackContext';
import { Feedback } from '../modules/Feedback';
import RatingSelect from './RatingSelect';
import Button from './shared/Button';
import Card from './shared/Card';

const FeedbackForm: React.FC = () => {
    const { feedbackEdit, addFeedback, updataFeedback } = useContext(FeedbackContext);

    const [text, setText] = useState('');
    const [rating, setRating] = useState(10);
    const [btnDisabled, setBtnDisabled] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (text.length === 0) {
            setBtnDisabled(true);
            setMessage('');
        } else if (text !== '' && text.trim().length <= 10) {
            setMessage('Text must be at least 10 characters');
            setBtnDisabled(true);
        } else {
            setMessage('');
            setBtnDisabled(false);
        }
    }, [text]);

    useEffect(() => {
        if (feedbackEdit.edit == true) {
            setBtnDisabled(false), setText(feedbackEdit.item.text);
            setRating(feedbackEdit.item.rating);
        }
    }, [feedbackEdit]);

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (text.trim().length > 9) {
            let newFeedback: Feedback = {
                text,
                rating,
            };

            if (feedbackEdit.edit === true) {
                updataFeedback(feedbackEdit.item.id!.toString(), newFeedback);
            } else {
                addFeedback(newFeedback);
            }

            setText('');
        }
    };

    return (
        <Card>
            <form onSubmit={handleSubmit}>
                <h2>How would you rate your service with us?</h2>
                <RatingSelect selected={rating} select={(rating: number) => setRating(rating)} />
                <div className="input-group">
                    <input type="text" placeholder="Write a review" value={text} onChange={handleTextChange} />
                    <Button type="submit" isDisabled={btnDisabled}>
                        Send
                    </Button>
                </div>

                {message && <div className="message">{message}</div>}
            </form>
        </Card>
    );
};

export default FeedbackForm;
