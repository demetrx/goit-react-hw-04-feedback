import { useState } from 'react';
import Section from './UI/Section';
import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import Statistics from './Statistics/Statistics';
import Notification from './Notification/Notification';

const output = {
  good: 'Good',
  neutral: 'Neutral',
  bad: 'Bad',
};

export const App = () => {
  const options = ['good', 'neutral', 'bad'];

  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const giveFeedbackHandler = e => {
    const { name } = e.target;

    switch (name) {
      case options[0]:
        setGood(ps => ps + 1);
        break;

      case options[1]:
        setNeutral(ps => ps + 1);
        break;

      case options[2]:
        setBad(ps => ps + 1);
        break;

      default:
        throw new Error('Unsupported option type: ' + name);
    }
  };

  const getTotalFeedback = () => {
    return good + neutral + bad;
  };

  const getPositiveFeedbackPercentage = () => {
    const total = getTotalFeedback();
    if (total === 0) {
      return 0;
    }

    return Math.round((good / total) * 100);
  };

  const totalFeedback = getTotalFeedback();
  const positivePercentage = getPositiveFeedbackPercentage() + '%';

  return (
    <>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={options}
          onLeaveFeedback={giveFeedbackHandler}
          output={output}
        />
      </Section>

      <Section title="Statistics">
        {totalFeedback === 0 ? (
          <Notification message="There is no feedback." />
        ) : (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={totalFeedback}
            positivePercentage={positivePercentage}
          />
        )}
      </Section>
    </>
  );
};
