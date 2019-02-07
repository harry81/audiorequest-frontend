import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable({
    providedIn: 'root'
})
export class AudioService {

    constructor(private httpClient: HttpClient) {}

    public uploadFile(audio: File): Observable<Response> {
        const formData = new FormData();

        formData.append('audio', audio);
        return this.httpClient.post<Response>('http://localhost:9000/audiorequest/', formData);
    }
}
