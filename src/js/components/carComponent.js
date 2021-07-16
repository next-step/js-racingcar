
export const Car = (name, num, finished) => (`
      <div class='car'>
         <div class='car-player mr-2'>${name}</div>
         ${Array.from({length:num}, (v,i) => i ).map(() => `<div class='forward-icon mt-2'>⬇️</div>`).join('')}
         ${!finished ? 
            `<div class='d-flex justify-center mt-3'>
               <div class='relative spinner-container'>
                  <span class='material spinner'></span>
               </div>
            </div>` : ''
         }  
      </div>`);