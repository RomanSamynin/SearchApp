import React from 'react';
import { observer } from 'mobx-react-lite';

const item = observer( ({result, loadinResult}) => {
    return (
        <div>
            {loadinResult ?
                <div> Запрос обрабатываеться...</div>
                :
                <>
                    {result.map(data => 
                        <div key={data.ID}>{data.DEVICE_NAME_ID}-{data.ID}</div>
                    )}
                </>
            }
            
        </div>
    )
})

export default item
