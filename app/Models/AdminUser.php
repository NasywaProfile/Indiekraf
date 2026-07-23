<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class AdminUser extends Authenticatable
{
    use HasFactory, HasApiTokens;

    protected $table = 'admin_users';

    protected $fillable = [
        'username',
        'password_hash',
        'name',
    ];

    protected $hidden = [
        'password_hash',
    ];

    public function getAuthPassword()
    {
        return $this->password_hash;
    }
}
