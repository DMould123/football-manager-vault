import React, { useState, useEffect } from 'react';
import FormationSelector from '../components/FormationSelector';
import Pitch from '../components/Pitch';
import axios from 'axios';
import { toast } from 'react-toastify';

function BestXI() {
  const [formation, setFormation] = useState(null);
  const [formationData, setFormationData] = useState({
    '4-4-2': { players: {}, playerNames: {} },
    '4-3-3': { players: {}, playerNames: {} },
    '3-5-2': { players: {}, playerNames: {} },
    '5-3-2': { players: {}, playerNames: {} },
  });

  useEffect(() => {
    fetchBestXI();
  }, []);

  const fetchBestXI = async () => {
    try {
      const response = await axios.get('/best-xi');
      if (response.data) {
        setFormation(response.data.formation);
        setFormationData(prevData => ({
          ...prevData,
          [response.data.formation]: {
            players: response.data.players,
            playerNames: response.data.playerNames || {},
          },
        }));
      }
    } catch (error) {
      console.error('Error fetching Best XI:', error);
      toast.error('Failed to load your Best XI. Please try again.');
    }
  };

  const handleFormationChange = (newFormation) => {
    setFormation(newFormation);
  };

  const handleBackToFormations = () => {
    setFormation(null);
  };

  const handlePlayerUpload = (position, imageUrl) => {
    setFormationData(prevData => ({
      ...prevData,
      [formation]: {
        ...prevData[formation],
        players: {
          ...prevData[formation].players,
          [position]: imageUrl,
        },
      },
    }));
  };

  const handlePlayerNameChange = (position, name) => {
    setFormationData(prevData => ({
      ...prevData,
      [formation]: {
        ...prevData[formation],
        playerNames: {
          ...prevData[formation].playerNames,
          [position]: name,
        },
      },
    }));
  };

  const saveBestXI = async () => {
    try {
      const currentFormationData = formationData[formation];
      const nonEmptyPlayers = Object.fromEntries(
        Object.entries(currentFormationData.players).filter(([_, value]) => value !== '')
      );
      const response = await axios.post('/best-xi', {
        formation,
        players: nonEmptyPlayers,
        playerNames: currentFormationData.playerNames,
      });
      console.log('Server response:', response.data);
      toast.success('Best XI saved successfully!');
    } catch (error) {
      console.error('Error saving Best XI:', error.response?.data || error.message);
      toast.error(`Failed to save Best XI: ${error.response?.data?.error || error.message}`);
    }
  };

  return (
    <div className="best-xi">
      <h1>Create Your Best XI</h1>
      <div className="best-xi-layout">
        <div className="best-xi-sidebar">
          <FormationSelector
            onSelect={handleFormationChange}
            selectedFormation={formation}
            onBack={handleBackToFormations}
          />
          {formation && <button onClick={saveBestXI}>Save Best XI</button>}
        </div>
        {formation && (
          <div className="best-xi-main">
            <Pitch
              formation={formation}
              players={formationData[formation].players}
              playerNames={formationData[formation].playerNames}
              onPlayerUpload={handlePlayerUpload}
              onPlayerNameChange={handlePlayerNameChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default BestXI;
