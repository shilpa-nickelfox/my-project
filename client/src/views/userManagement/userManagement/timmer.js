import React from 'react'
import PORTNUMBER from "../../api/api";
import { toast } from "react-toastify";
import { Link, useParams, useHistory } from "react-router-dom";
import moment from 'moment';
import axios from "axios";
import prettyMs from 'pretty-ms'
import toMs from '@sindresorhus/to-milliseconds'
import parseMs from 'parse-ms'

function Edit({time, onSave, onCancel}) {
  const daysRef = React.useRef(null)
  const hoursRef = React.useRef(null)
  const minutesRef = React.useRef(null)
  const secondsRef = React.useRef(null)
  const {days, hours, minutes, seconds} = parseMs(time)
  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault()
          onSave(
            toMs({
              days: Number(daysRef.current.value),
              hours: Number(hoursRef.current.value),
              minutes: Number(minutesRef.current.value),
              seconds: Number(secondsRef.current.value),
            }),
          )
        }}
      >
        <label>
          Days: <input type="number" defaultValue={days} ref={daysRef} />
        </label>
        <br />
        <label>
          Hours: <input type="number" defaultValue={hours} ref={hoursRef} />
        </label>
        <br />
        <label>
          Minutes:{' '}
          <input type="number" defaultValue={minutes} ref={minutesRef} />
        </label>
        <br />
        <label>
          Seconds:{' '}
          <input type="number" defaultValue={seconds} ref={secondsRef} />
        </label>
        <div style={{marginTop: 10}}>
          <button type="submit">Save</button>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

function Stopwatch(props) {
  const { user, endUser, id } = props;
  const [lapse, setLapse] = React.useState(endUser)
  const Token = localStorage.getItem("authtoken");
  const [editing, setEditing] = React.useState(false)
  const [running, setRunning] = React.useState(false)
  const editRef = React.useRef(null)
  const timerRef = React.useRef(null)
  const PORT = PORTNUMBER.PORTNUMBER;
  React.useEffect(() => () => clearInterval(timerRef.current), [running])
 // React.useEffect(() => () => setLapse(endUser), [])
  React.useEffect(
    () => {
      if (running) {
        const startTime = Date.now() - lapse  
        timerRef.current = setInterval(() => {
          // round to the nearest second
          setLapse(Math.round((Date.now() - startTime) / 1000) * 1000)
        }, 1000)
        
      } else {
        clearInterval(timerRef.current)
        let DataValue = {
          Id: id,
          projectName: user.projectName,
          client: user.client,
          template: user.template,
          start: Date.now,
          end:lapse
        };
  
        axios
          .post(`${PORT}/edittime`, DataValue, {
            headers: { authtoken: Token },
          })
          .then((res) => {
            if (res.data.status === 400) {
              toast.success("This User is already exists.");
            } else {
              toast.success("User is updated successfully.");
              //  history.push("/UserManagement");
            }
          })
      
      }
    },
    [running],
  )

  function handleSaveClick(newLapse) {
    setEditing(false)
    setLapse(newLapse)
  }

  function handleEditClick() {
    setRunning(false)
    setEditing(true)
  }

  return (
    <div>
      {editing ? (
        <Edit
          time={lapse}
          onSave={handleSaveClick}
          onCancel={() => setEditing(false)}
        />
      ) : (
        <>
          <div>
            <label
              style={{
                fontSize: '2em',
               // display: 'block',
              }}
            >
              {prettyMs(lapse)}
            </label>
            <button
              onClick={() => setRunning(r => !r)}
              style={{
                border: '1px solid #ccc',
                background: '#fff',
                fontSize: '2em',
                padding: 5,
                margin: 2,
                width: 100,
              }}
            >
              {running ? 'Stop' : 'Start'}
            </button>
          </div>
          {/* <button onClick={handleEditClick}>manually edit</button> */}
        </>
      )}
    </div>
  )
}

export default  Stopwatch;