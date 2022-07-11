<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;



class UserController extends Controller
{
    //

    public function createUser(Request $request){

        $validateUtillisateur = $request->validate([
            'prenom'=>'required|string',
            'nom'=>'required|string',
            'email'=>'required|string|unique:users,email',
            'password'=>'required|string|confirmed'
        ]);

        $utillisateur = User::create([
            'prenom'=>$validateUtillisateur['prenom'],
            'nom'=>$validateUtillisateur['nom'],
            'email'=>$validateUtillisateur['email'],
            'password'=>bcrypt($validateUtillisateur['password'])
        ]);


        $token = $utillisateur->createToken('colbrtoken')->plainTextToken;

        $response = [
            'utillisateur'=>$utillisateur,
            'token'=>$token
        ];

        return response($response, 201);

    }



        public function connectUser(Request $request){

            $validateUtillisateur = $request->validate([
                'email'=>'required|string',
                'password'=>'required|string'
            ]);
    
            //verification de l'email
            $utillisateur = User::where('email', $validateUtillisateur['email'])->first();


            //verification du mot de passe
            if(!$utillisateur || !Hash::check($validateUtillisateur['password'], $utillisateur->password)){
                  return response([
                    'message' => 'erreur identifiants de connexion'
                  ], 401);
            }
    

            //Pour les futures routes private de lapi
            $token = $utillisateur->createToken('colbrtoken')->plainTextToken;
    
            $response = [
                'utillisateur'=>$utillisateur,
                'token'=>$token
            ];
    
            return response($response, 201);
        }
    }


