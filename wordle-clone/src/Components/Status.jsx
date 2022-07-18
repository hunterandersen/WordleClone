import React from 'react';
import * as MyConstants from "../resources/MyConstants";

export default function Status({ statusMessage }) {
  return (
    <div>
        <h2 className={`statusMessage ${(statusMessage===MyConstants.MESSAGE_NOT_WORD || statusMessage.includes(MyConstants.MESSAGE_GAME_OVER))? 'statusColorRed' : null}`}>
            {statusMessage}
        </h2>
    </div>
  )
}
