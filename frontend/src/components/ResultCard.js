import React from 'react';

function ResultCard({ result }) {
  const getEmoji = (prediction) => {
    switch (prediction) {
      case 'boiled_bulb':
        return '🫒';
      case 'boiled_finger':
        return '🫒';
      case 'raw_bulb':
        return '🌿';
      case 'raw_finger':
        return '🌿';
      default:
        return '🥘';
    }
  };

  const getPredictionLabel = (prediction) => {
    return prediction
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const emoji = getEmoji(result.prediction);
  const confidencePercent = result.confidence;

  return (
    <div className="result-card">
      <div className="result-header">
        <h2>Prediction Result</h2>
        <div className="result-prediction">
          {emoji} {getPredictionLabel(result.prediction)}
        </div>
        <div className="result-confidence">
          Confidence: <strong>{confidencePercent}%</strong>
        </div>
      </div>

      <div className="result-body">
        <div className="confidence-bar">
          <div
            className="confidence-fill"
            style={{ width: `${confidencePercent}%` }}
          >
            {confidencePercent > 10 && `${confidencePercent}%`}
          </div>
        </div>

        {result.all_predictions && (
          <div className="all-predictions">
            <h3>All Predictions</h3>
            {Object.entries(result.all_predictions).map(
              ([prediction, probability]) => (
                <div key={prediction} className="prediction-item">
                  <span className="prediction-label">
                    {getPredictionLabel(prediction)}
                  </span>
                  <span className="prediction-value">{probability}%</span>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ResultCard;
