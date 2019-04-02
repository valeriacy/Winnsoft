REQUISITOS
==============
- xampp 
- [composer](https://getcomposer.org/download/)
- [visual code](https://code.visualstudio.com/download)
- [git](https://git-scm.com/downloads)
- [git extensions*](https://sourceforge.net/projects/gitextensions/)
- [Cuenta en Github](https://github.com/join?source=header-home)

* opcional
PARA EMPEZAR A USAR
==================
1. git clone https://github.com/valeriacy/Winnsoft.git
2. cd winnsoft
3. composer install
4. copy .env.example .env
5. En el nuevo archivo creado .env configurar la conexion con mysql (nombre de la BD, usuario y contraseña)
6. php artisan migrate
7. php artisan key:generate
8. **Para levantar el servidor:** php artisan serve

PASOS y COMANDOS PARA EMPEZAR EL PROYECTO DE 0 (FINES DEMOSTRATIVOS NO EJECUTARLOS)
==================
1. Creacion Proyecto.- composer create-project laravel/laravel NombreProyecto 5.4
2. Configurar .env en el nuevo proyecto, para las credenciales de MySql
3. Migracion, para el modelo, 'php artisan make:migration NombreMigracion'
4. En la migracion creada poner el codigo para crear las tablas. Documentacion ejemplo:
	-https://medium.com/@david.quezada.m/tutorial-api-restful-con-laravel-5-6-en-menos-de-1000-palabras-e14249fef9a9
	-https://laravel.com/docs/5.8/migrations#creating-tables
5. Hacer efectiva la migracion: 'php artisan migrate'.
6. Creacion de una clase modelo, que sera mapeada con la tabla del mismo nombre: 'php artisan make:model NombreModelo'
7. Creacion del controlador: 'php artisan make:controller NombreControlador -r'
8. Ir al archivo /route/api.php, agregar las configuraciones de mapeado
	Route::resource('NombreModelo', 'NombreControlador');
9. Ejecutar php artisan route:list y revisar si se agregaron correctamente las rutas
10. Codificar el controlador.

ENLACES DE UTILIDAD
=============
- Ejemplo de Api Rest:https://medium.com/@david.quezada.m/tutorial-api-restful-con-laravel-5-6-en-menos-de-1000-palabras-e14249fef9a9
- Codigo ejemplo para las migraciones:https://laravel.com/docs/5.8/migrations#creating-tables
