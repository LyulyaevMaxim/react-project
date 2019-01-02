import React from 'react'
import Switches from '~modules/switches'
import SwitchableBlock from './switchable-block'
import './index.pcss'

function SwitchesDemo() {
  return <Switches {...{ data, calcMinHeight: true }} className='demo' />
}

var data = [
  {
    title: 'Cканер штрих-кодов',
    content: (
      <SwitchableBlock
        title='Cканер штрих-кодов'
        description='Любой с USB или беспроводной через Bluetooth'
        img='equipment-01.jpg'
        other={
          <React.Fragment>
            <equipment-product>
              <equipment-product-logo class='scanner' />
              <equipment-product-title>Сканер Штрих-кода АТОЛ SB 1101</equipment-product-title>
              <equipment-product-price>2200</equipment-product-price>
              <a href='#' className='equipment-product-cart' />
            </equipment-product>

            <equipment-product>
              <equipment-product-logo class='scanner' />
              <equipment-product-title>Ручной 2D сканер штрих-кода
Honeywell Metrologic 1450g</equipment-product-title>
              <equipment-product-price>5750</equipment-product-price>
              <a href='#' className='equipment-product-cart' />
            </equipment-product>
          </React.Fragment>
        }
      />
    ),
  },
  {
    title: 'Банковский терминал',
    content: (
      <SwitchableBlock
        title='Банковский терминал'
        description='Любой с USB или беспроводной через Bluetooth'
        img='equipment-02.jpg'
        other={
          <React.Fragment>
            <equipment-product>
              <equipment-product-logo class='bank-terminal' />
              <equipment-product-title>Банковский терминал Ingenico IPP320 </equipment-product-title>
              <a href='#' className='equipment-product-request'>
                Оставить заявку
              </a>
            </equipment-product>

            <equipment-product>
              <equipment-product-logo class='bank-terminal' />
              <equipment-product-title>Банковский терминал Ingenico IPP320</equipment-product-title>
              <a href='#' className='equipment-product-request'>
                Оставить заявку
              </a>
            </equipment-product>
          </React.Fragment>
        }
      />
    ),
  },
  {
    title: 'УТМ-модуль для ЕГАИС',
    content: (
      <SwitchableBlock
        title='УТМ-модуль для ЕГАИС'
        description='УТМ нужен для торговли крепким алкоголем и пивом. Передает данные в ЕГАИС'
        img='equipment-03.jpg'
        other={
          <React.Fragment>
            <equipment-product>
              <equipment-product-logo class='atol' />
              <equipment-product-title>АТОЛ HUB-19 для ЕГАИС</equipment-product-title>
              <equipment-product-price>14000</equipment-product-price>
              <a href='#' className='equipment-product-cart' />
            </equipment-product>
          </React.Fragment>
        }
      />
    ),
  },
  {
    title: 'Весы',
    content: (
      <SwitchableBlock
        title='Весы'
        description='Подключаются через RS 232 – USB со стороны терминала или USB'
        img='equipment-04.jpg'
        other={
          <React.Fragment>
            <equipment-product>
              <equipment-product-logo class='weigher-1' />
              <equipment-product-title>Весы Штрих-СЛИМ 300М 15-2.5 Д1 (POS2)</equipment-product-title>
              <equipment-product-price>8500</equipment-product-price>
              <a href='#' className='equipment-product-cart' />
            </equipment-product>

            <equipment-product>
              <equipment-product-logo class='weigher-2' />
              <equipment-product-title>Весы Cas AD 25</equipment-product-title>
              <equipment-product-price>11500</equipment-product-price>
              <a href='#' className='equipment-product-cart' />
            </equipment-product>

            <equipment-product>
              <equipment-product-logo class='weigher-3' />
              <equipment-product-title>Весы «Масса»</equipment-product-title>
              <equipment-product-price>XXXX</equipment-product-price>
              <a href='#' className='equipment-product-cart' />
            </equipment-product>
          </React.Fragment>
        }
      />
    ),
  },
  {
    title: 'Принтер этикеток',
    content: (
      <SwitchableBlock
        title='Принтер этикеток'
        description='Подключаются через RS 232 – USB со стороны терминала или USB'
        img='equipment-05.jpg'
        other={
          <React.Fragment>
            <equipment-product>
              <equipment-product-logo class='printer-1' />
              <equipment-product-title>Принтер этикеток Zebra-ZD410_1</equipment-product-title>
              <a href='#' className='equipment-product-request'>
                Оставить заявку
              </a>
            </equipment-product>

            <equipment-product>
              <equipment-product-logo class='printer-2' />
              <equipment-product-title>Принтер этикеток АТОЛ BP21</equipment-product-title>
              <a href='#' className='equipment-product-request'>
                Оставить заявку
              </a>
            </equipment-product>
          </React.Fragment>
        }
      />
    ),
  },
  {
    title: 'Денежный ящик',
    content: (
      <SwitchableBlock
        title='Денежный ящик'
        description='Подключается через разъем RJ-12 или USB, если нет гнезда RJ-12'
        img='equipment-06.jpg'
        other={
          <React.Fragment>
            <equipment-product>
              <equipment-product-logo class='money-box' />
              <equipment-product-title>Денежный ящик для Эвотора</equipment-product-title>
              <equipment-product-price>3500</equipment-product-price>
              <a href='#' className='equipment-product-cart' />
            </equipment-product>
          </React.Fragment>
        }
      />
    ),
  },
]

export default SwitchesDemo
