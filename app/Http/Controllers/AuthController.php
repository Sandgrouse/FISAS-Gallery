<?php

namespace App\Http\Controllers;




use Illuminate\Http\Request;
use App\User;
use DigitalDrifter\LaravelChromeLogger\LaravelChromeLogger;

class AuthController extends Controller
{
    //


    public function register(Request $request)
    {
      $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => bcrypt($request->password),
      ]);

      $token = auth()->login($user);

      return $this->respondWithToken($token);
    }

    public function login(Request $request)
    {
      $credentials = $request->only(['email', 'password']);

      if (!$token = auth()->attempt($credentials)) {
        LaravelChromeLogger::warn('something went wrong!', $credentials);
        return response()->json(['error' => 'You Are Not A Member'], 401);
      }

      LaravelChromeLogger::log('Hello Jeffo');
      return $this->respondWithToken($token);
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
    */
    public function me()
    {
        return response()->json(auth()->user());
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
    */
    public function logout()
    {
        auth()->logout();
        LaravelChromeLogger::log('See you later');

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
    */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }


    protected function respondWithToken($token)
    {
      return response()->json([
        'access_token' => $token,
        'token_type' => 'bearer',
        'expires_in' => auth()->factory()->getTTL() * 60,
        'user' => $this->me()->original
      ]);
    }

}
