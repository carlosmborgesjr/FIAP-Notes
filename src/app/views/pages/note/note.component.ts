import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Note } from 'src/app/services/@types/note';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  constructor(private noteService: NoteService){}

  @Input()
  noteProp = {} as Note;

  @Input()
  titleProp: any;

  @Output()
  notify = new EventEmitter();

  ngOnInit(): void { }

  confirmRemove(){
    if(confirm("Deseja realmente apagar esta nota?"))
      this.notify.emit();
  }

  /** 
  @param note
  */
  editNote(note:Note){
    if(confirm("Deseja realmente editar esta nota?")){
      this.noteService.notifyNewNoteEdited(note);

      this.noteService.getNotes().subscribe({
        next: (apiNotes) => {
          apiNotes.forEach(element => {
            if(element.id != note.id){
              this.hideIcon(element.id);
            }
          });
        },
        error: (error) => console.error(error),
      });
    }
  }

  /**
  @param note 
  */

  hideIcon(id: number){
    const element = document.getElementById(id+"_edit");
    element!.style.display = 'none';
    const elementDelete = document.getElementById(id+"_delete");
    elementDelete!.style.display = 'none';
  }
}