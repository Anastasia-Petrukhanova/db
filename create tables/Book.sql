USE [for_project]
GO

/****** Object:  Table [dbo].[Book]    Script Date: 24.12.2021 10:45:41 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Book](
	[id_key] [uniqueidentifier] ROWGUIDCOL  NOT NULL,
	[start] [date] NOT NULL,
	[end] [date] NOT NULL,
	[id_client] [uniqueidentifier] NOT NULL,
	[id_room] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id_key] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Book] ADD  CONSTRAINT [DF_Book_id_key]  DEFAULT (newid()) FOR [id_key]
GO

ALTER TABLE [dbo].[Book]  WITH CHECK ADD FOREIGN KEY([id_client])
REFERENCES [dbo].[Client] ([id_key])
GO

ALTER TABLE [dbo].[Book]  WITH CHECK ADD FOREIGN KEY([id_room])
REFERENCES [dbo].[Room] ([id])
GO


