<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Kodeine\Acl\Models\Eloquent\Role;

class CreateRole extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'phoenix:createrole';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Creates New Role';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        //
        $role = new Role();
        $role->name = $this->ask('Enter The Role Name ?');
        $role->slug = $this->ask('Enter The Slug?');
        $role->description = $this->ask('Enter description ?');

        if($role->save()) {
            $this->info("Role created Succesfully...");
        } else {
            $this->error("failed to create role");
        }
    }
}
