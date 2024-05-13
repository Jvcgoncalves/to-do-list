export default function disbleFilterButton(button: HTMLElement){
  if(document.querySelector('.available-options[disabled]')){
    document.querySelector('.available-options[disabled]')?.removeAttribute('disabled')
  } 
  button.toggleAttribute('disabled');
}