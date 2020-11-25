import React, { useState, useEffect, useRef } from 'react';
import Moment from 'react-moment';
import {
  GAME_STATUS_START,
  GAME_STATUS_STOP,
  GAME_STATUS_FINISH,
} from '../../config';

const Timer = ({ status }) => {
  const [elapsed, setElapsed] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const timeRef = useRef(null);

  useEffect(() => {
    if (status === GAME_STATUS_START) {
      setStartTime(Date.now());
    }
  }, [status])

  useEffect(() => {
    if (status === GAME_STATUS_START && startTime) {
      timeRef.current = setInterval(() => {
        setElapsed(Date.now() - startTime)
      }, 1000);
    }
    return () => {
      clearInterval(timeRef.current)
    }
  }, [status, startTime])

  useEffect(() => {
    if (status === GAME_STATUS_STOP) {
      clearInterval(timeRef.current)
      setElapsed(0);
      setStartTime(0);
    }
  }, [status])

  useEffect(() => {
    if (status === GAME_STATUS_FINISH) {
      clearInterval(timeRef.current)
    }
  }, [status])


  return (
    <Moment format="mm:ss">
      {elapsed}
    </Moment>
  )
}

export default Timer

