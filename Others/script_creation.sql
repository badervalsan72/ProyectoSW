USE ServiciosWebDB;  
GO 

create table Usuarios (
	NombreUsuario varchar(50) not null primary key, 
	Nombre varchar(50) not null, 
	PrimerApellido varchar(50) not null, 
	SegundoApellido varchar(50) not null, 
	CorreoElectronico nvarchar(100) not null, 
	Contrase�a nvarchar(100) not null, 
	PreguntaSeguridad varchar(100), 
	RespuestaSeguridad varchar(100)
)

create table Paises ( 
	Codigo int not null primary key, 
	Nombre varchar(50) not null, 
	ImgPais varchar(50) not null 	
) 

create table Aerolineas (
	Codigo int not null primary key, 
	nombreAgencia varchar(50) not null, 
	ImgAgencia varchar(50) not null,
	PaisOrigen varchar(50) not null
) 

create table AerolineasEsp ( 
	CodigoEsp int not null primary key, 
	CodigoAerolinea int FOREIGN KEY REFERENCES Aerolineas(Codigo), 
	CodigoPais int FOREIGN KEY REFERENCES Paises(Codigo)
)

create table Aeropuertos ( 
	Codigo int not null primary key, 
	Nombre varchar(100) not null, 
	CodigoPais int FOREIGN KEY REFERENCES Paises(Codigo) 
)

create table AeropuertosEsp ( 
	CodigoEsp int not null primary key, 
	CodigoAeropuerto int FOREIGN KEY REFERENCES Aeropuertos(Codigo) 
)

create table Puertas ( 
	Codigo int not null primary key, 
	numeroPuerta varchar(50) not null, 
	CodigoPais int FOREIGN KEY REFERENCES Paises(Codigo), 
	estado bit not null
	
) 

create table Bitacora (
	Codigo int not null primary key, 
	NombreUsuario varchar(50) FOREIGN KEY REFERENCES Usuarios(NombreUsuario), 
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


create table Tarjetas ( 
	
	NumTarjeta varchar(100) primary key not null, 
	mesExp int not null, 
	a�oExp int not null, 
	ccv int not null,
	monto varchar(50) not null,	
	tipo varchar(50) not null 
) 

create table EasyPay ( 
	NumCuenta varchar(50) primary key not null, 
	CodigoSeguridad varchar(50) not null, 
	Contrase�a varchar(50) not null, 
	estadoTransaccion varchar(50) not null, 
) 


 

CREATE PROCEDURE insertPais  
    @Codigo int,   
    @Nombre nvarchar(50), 
	@ImgPais nvarchar(50) 
AS   

    
    INSERT INTO Paises (Codigo, Nombre, ImgPais) 
	VALUES (@Codigo, @Nombre, @ImgPais) 
GO 