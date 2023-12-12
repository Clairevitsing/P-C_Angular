import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/interface/IUser.modele';
import { TokenService } from 'src/app/service/token.service';
import { UserService } from 'src/app/service/user.service';
import {ToastrService} from "ngx-toastr";
import {INft} from "../../interface/INft.module";
import {NftService} from "../../service/nft.service";


@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
  users: IUser[] = []
  nfts: INft[] = []

  constructor(private user: UserService, private tokenService: TokenService,private toastrService: ToastrService, private nftService: NftService){}

  ngOnInit(){
    this.displayAllUser();
  }

  displayAllUser(){
    this.user.getAllUsers().subscribe(
      (data) => {
        this.users = data['hydra:member'];
      }
    );
  }

    fetchAllNft(){
    this.nftService.getAllNfts().subscribe(
      (data) => {
        this.nfts = data['hydra:member']
        console.log(this.nfts)
      }
    )
  }
    userDelete(id: number): void {
    this.user.deleteUser(id).subscribe(
      () => {
        this.toastrService.success("delete the user successfully");
      }
    )
  }

  isLoggedIn(): boolean{
    return this.tokenService.getIsLogged();
  }

}
