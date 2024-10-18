import React, { useState, useEffect } from 'react';
import FormationSelector from '../components/FormationSelector';
import Pitch from '../components/Pitch';
import axios from 'axios';
import { toast } from 'react-toastify';

function BestXI() {
  const [formation, setFormation] = useState('4-4-2');
  const [players, setPlayers] = useState({});

  useEffect(() => {
    fetchBestXI();
  }, []);

  const fetchBestXI = async () => {
    try {
      const response = await axios.get('/best-xi');
      if (response.data) {
        setFormation(response.data.formation);
        setPlayers(response.data.players);
      }
    } catch (error) {
      console.error('Error fetching Best XI:', error);
      toast.error('Failed to load your Best XI. Please try again.');
    }
  };

  const handleFormationChange = (newFormation) => {
    setFormation(newFormation);
    setPlayers({});
  };

  const handlePlayerUpload = (position, imageUrl) => {
    setPlayers((prevPlayers) => ({ ...prevPlayers, [position]: imageUrl }));
  };

  const saveBestXI = async () => {
    try {
      const nonEmptyPlayers = Object.fromEntries(
        Object.entries(players).filter(([_, value]) => value !== '')
      );
      const response = await axios.post('/best-xi', { formation, players: nonEmptyPlayers });
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
      <FormationSelector onSelect={handleFormationChange} />
      <Pitch formation={formation} players={players} onPlayerUpload={handlePlayerUpload} />
      <button onClick={saveBestXI}>Save Best XI</button>
    </div>
  );
}

export default BestXI;
