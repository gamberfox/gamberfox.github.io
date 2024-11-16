

class Robot {
  x:number;
  y:number;
  previousX:number;
  previousY:number;
  gridWidth:number;
  gridHeight:number;
  difficulty:number;
  previousCell:string;
  cell:HTMLElement;
  passengerWasFound:boolean;

  constructor(x:number, y:number, gridWidth:number, gridHeight:number,difficulty:number) {
    this.previousX = x;
    this.previousY = y;
    this.x = x;
    this.y = y;
    this.gridWidth = gridWidth;
    this.gridHeight = gridHeight;
    this.difficulty=difficulty;
    this.previousCell='cell0';
    this.cell=map?.querySelector(`[data-x="${this.previousX}"][data-y="${this.previousY}"]`) as HTMLElement;
    this.passengerWasFound=false;
  }

  updateGrid() {
    if(this.previousCell==='cell5'){
      this.cell.className='cell0';
    }
    else{
      this.cell.className=this.previousCell;
    }
    this.cell=map?.querySelector(`[data-x="${this.x}"][data-y="${this.y}"]`) as HTMLElement;
    this.previousCell=this.cell.className;
    //if(this.cell.className==='cell6') alert('you won, congrats');
    if(this.previousCell==='cell5') this.passengerWasFound=true;

    if(this.passengerWasFound){
      this.cell.className='cell7';
    }
    else {
      this.cell.className='cell2';
    }
    this.previousX=this.x;
    this.previousY=this.y;
  }

  moveRightUp() {
    if (this.y > 0) {
      this.y -= 1;
      this.updateGrid();
    } else {
      alert("Can't move up, at top boundary.");
    }
  }

  moveUpRight() {
    if (this.y < this.gridHeight - 1) {
      this.y += 1;
      this.updateGrid();
    } else {
      alert("Can't move down, at bottom boundary.");
    }
  }

  moveUpLeft() {
    if (this.x > 0) {
      this.x -= 1;
      this.updateGrid();
    } else {
      alert("Can't move left, at left boundary.");
    }
  }

  moveLeftUp() {
    if (this.x < this.gridWidth - 1) {
      //this.taxiCell.className='cell0';
      this.x += 1;
      this.updateGrid();
    } else {
      alert("Can't move right, at right boundary.");
    }
  }

  moveLeftDown() {
    if (this.x < this.gridWidth - 1) {
      //this.taxiCell.className='cell0';
      this.x += 1;
      this.updateGrid();
    } else {
      alert("Can't move right, at right boundary.");
    }
  }

  moveDownLeft() {
    if (this.x < this.gridWidth - 1) {
      //this.taxiCell.className='cell0';
      this.x += 1;
      this.updateGrid();
    } else {
      alert("Can't move right, at right boundary.");
    }
  }

  moveDownRight() {
    if (this.x < this.gridWidth - 1) {
      //this.taxiCell.className='cell0';
      this.x += 1;
      this.updateGrid();
    } else {
      alert("Can't move right, at right boundary.");
    }
  }

  moveRightDown() {
    if (this.x < this.gridWidth - 1) {
      //this.taxiCell.className='cell0';
      this.x += 1;
      this.updateGrid();
    } else {
      alert("Can't move right, at right boundary.");
    }
  }

  delay(ms:number) {
      return new Promise(resolve => setTimeout(resolve, ms));
  }
  async followDirections(listOfMovements:number[]){
    console.log(`Im gonna start following directions`);
    
    for(let direction of listOfMovements){//right=0, up=1, left=2, down=3.
      switch(direction){
        case 0:
          //setTimeout(()=> this.moveRight(),1000);
          this.moveRightUp();
          break;
        case 1:
          this.moveUpRight();
          break;
        case 2:
          this.moveUpLeft();
          break;
        case 3:
          this.moveLeftUp();
          break;
        case 4:
          this.moveLeftDown();
          break;
        case 5:
          this.moveDownLeft();
          break;
        case 6:
          this.moveDownRight();
          break;
        case 7:
          this.moveRightDown();
          break;
        default:
          console.log('there is no answer');
          break;
      }
      await this.delay(this.difficulty);
    }
    if(!nutcrackerAudio.paused){
      nutcrackerAudio.pause();
      nutcrackerAudio.currentTime = 2;
      joySongAudio.currentTime=1;
      joySongAudio.play();
    }
    visualizationIsRunning=false;
    // visualizeButton.disabled=false;
  }
}
  