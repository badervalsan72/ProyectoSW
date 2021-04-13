USE ServiciosWebDB;  
GO 

/*
drop table EasyPay
drop table Tarjetas 
drop table Boletos 
drop table Vuelos 
drop table Bitacora 
drop table Puertas 
drop table AerolineasEsp
drop table Aeropuertos 
drop table Aerolineas 
drop table Paises 
drop table Usuarios
drop table Roles 
drop table errores
drop table consecutivos
*/

create table Consecutivos (
	ConsecutivoID int primary key not null, 
	Descripcion varchar(100) not null,
	PoseePrefijo bit not null, 
	Prefijo varchar(100),
	PoseeRango bit not null, 
	RangoInicial int,
	RangoFinal int
)

create table Roles ( 
	Codigo int primary key not null, 
	Descripcion varchar(50)
)

create table Usuarios (
	NombreUsuario varchar(50) not null primary key, 
	Nombre varchar(50) not null, 
	PrimerApellido varchar(50) not null, 
	SegundoApellido varchar(50) not null, 
	CorreoElectronico nvarchar(100) not null, 
	Contraseña nvarchar(100) not null, 
	CodigoRol int FOREIGN KEY REFERENCES Roles(Codigo)
)

create table Paises ( 
	Codigo varchar(100) not null primary key, 
	Nombre varchar(50) not null, 
	ImgPais varchar(50) not null 	
) 

create table Aerolineas (
	Codigo varchar(100) not null primary key, 
	nombreAgencia varchar(50) not null, 
	ImgAgencia varchar(50) not null,
	PaisOrigen varchar(50) not null
) 

create table Aeropuertos ( 
	Codigo int not null primary key, 
	Nombre varchar(100) not null, 
	CodigoPais int FOREIGN KEY REFERENCES Paises(Codigo) 
)

create table AerolineasEsp ( 
	CodigoEsp int not null primary key, 
	CodigoAerolinea int FOREIGN KEY REFERENCES Aerolineas(Codigo), 
	CodigoAeroPuerto int FOREIGN KEY REFERENCES Aeropuertos(Codigo)
)

create table Puertas ( 
	Codigo varchar(100) not null primary key, 
	numeroPuerta varchar(50) not null, 
	CodigoAeroPuerto int FOREIGN KEY REFERENCES Aeropuertos(Codigo), 
	estado bit not null
	
) 

create table Bitacora (
	Codigo int not null primary key, 
	Fecha date not null, 
	NombreUsuario varchar(50) FOREIGN KEY REFERENCES Usuarios(NombreUsuario), 
	Tipo  varchar(50) not null, 
	CodigoRegistro int not null, 
	Descripcion varchar(100) not null, 
	RegistroDetalle varchar (100) not null 
)

create table Vuelos ( 
	Codigo varchar(100) not null primary key,
	CodigoAerolinea int FOREIGN KEY REFERENCES Aerolineas(Codigo) not null,
	CodigoOrigen int FOREIGN KEY REFERENCES Paises(Codigo) not null, 
	CodigoDestino int FOREIGN KEY REFERENCES Paises(Codigo) not null, 
	fecha date not null, 
	hora time not null, 
	estado int not null, 
	CodigoPuerta int FOREIGN KEY REFERENCES Puertas(Codigo) not null, 

) 

create table Boletos ( 
	Codigo varchar(100) primary key not null,
	CodigoVuelo varchar(100) FOREIGN KEY REFERENCES Vuelos(Codigo) not null, 
	NombreUsuario varchar(50) FOREIGN KEY REFERENCES Usuarios(NombreUsuario) not null, 
	Asiento varchar(50) not null, 
	estadoBoleto bit not null, 
)

-- dividir boletos en 2 compras y reservaciones 


create table Tarjetas ( 
	
	NumTarjeta varchar(100) primary key not null, 
	mesExp int not null, 
	añoExp int not null, 
	ccv int not null,
	monto varchar(50) not null,	
	tipo varchar(50) not null 
) 

create table EasyPay ( 
	NumCuenta varchar(50) primary key not null, 
	CodigoSeguridad varchar(50) not null, 
	Contraseña varchar(50) not null, 
	estadoTransaccion varchar(50) not null, 
) 


create table Errores ( 
	NumError int primary key not null, 
	Fecha date not null, 
	hora time not null, 
	Mensaje varchar(100) not null 
)
 


INSERT INTO Roles 
VALUES (1, 'Administrador')

INSERT INTO Roles 
VALUES (2, 'Seguridad')

INSERT INTO Roles 
VALUES (3, 'Consecutivo')

INSERT INTO Roles 
VALUES (4, 'Mantenimiento')

INSERT INTO Roles 
VALUES (5, 'Consulta')


INSERT INTO Roles 
VALUES (6, 'Default')